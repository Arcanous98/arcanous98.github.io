import zipfile,re,json,math,sys,os
S,OUT=sys.argv[1],sys.argv[2]
MUNIS={'50049':'BIEL','50149':'LUESIA','50145':'LONGÁS','50110':'EL FRAGO','50198':'ORÉS','50186':'MURILLO DE GÁLLEGO','50241':'SANTA EULALIA DE GÁLLEGO','22007':'AGÜERO','22270':'LAS PEÑAS DE RIGLOS'}
# ---- UTM 30N (ETRS89/GRS80) -> lon/lat (Snyder inverse)
a=6378137.0; f=1/298.257222101; e2=2*f-f*f; ep2=e2/(1-e2); k0=0.9996; lon0=math.radians(-3.0)
e1=(1-math.sqrt(1-e2))/(1+math.sqrt(1-e2))
def utm2ll(E,N):
    x=E-500000.0; M=N/k0; mu=M/(a*(1-e2/4-3*e2*e2/64-5*e2**3/256))
    phi1=mu+(3*e1/2-27*e1**3/32)*math.sin(2*mu)+(21*e1*e1/16-55*e1**4/32)*math.sin(4*mu)+(151*e1**3/96)*math.sin(6*mu)+(1097*e1**4/512)*math.sin(8*mu)
    s=math.sin(phi1); c=math.cos(phi1); t=math.tan(phi1)
    N1=a/math.sqrt(1-e2*s*s); T1=t*t; C1=ep2*c*c; R1=a*(1-e2)/(1-e2*s*s)**1.5; D=x/(N1*k0)
    lat=phi1-(N1*t/R1)*(D*D/2-(5+3*T1+10*C1-4*C1*C1-9*ep2)*D**4/24+(61+90*T1+298*C1+45*T1*T1-252*ep2-3*C1*C1)*D**6/720)
    lon=lon0+(D-(1+2*T1+C1)*D**3/6+(5-2*C1+28*T1-3*C1*C1+8*ep2+24*T1*T1)*D**5/120)/c
    return [round(math.degrees(lon),6), round(math.degrees(lat),6)]
def dec(raw):
    head=raw[:120].decode('ascii',errors='ignore')
    m=re.search(r'encoding="([^"]+)"',head); enc=(m.group(1) if m else 'utf-8').lower()
    return raw.decode('latin-1' if enc.startswith('iso-8859') else 'utf-8',errors='replace')
def dp(pts,tol):
    if len(pts)<4: return pts
    keep=[False]*len(pts); keep[0]=keep[-1]=True; stack=[(0,len(pts)-1)]
    while stack:
        a_,b_=stack.pop(); ax,ay=pts[a_]; bx,by=pts[b_]; dx,dy=bx-ax,by-ay; L=dx*dx+dy*dy; mx=-1; mi=-1
        for i in range(a_+1,b_):
            px,py=pts[i]
            if L==0: d=math.hypot(px-ax,py-ay)
            else:
                t=max(0,min(1,((px-ax)*dx+(py-ay)*dy)/L)); d=math.hypot(px-(ax+t*dx),py-(ay+t*dy))
            if d>mx: mx=d; mi=i
        if mx>tol: keep[mi]=True; stack.append((a_,mi)); stack.append((mi,b_))
    out=[p for p,k in zip(pts,keep) if k]
    return out if len(out)>=4 else pts
def rings_from(block,tol=0.35):
    """return list of polygons; each polygon = list of rings (exterior first)"""
    polys=[]
    for patch in re.findall(r'<gml:PolygonPatch>(.*?)</gml:PolygonPatch>',block,re.S):
        rings=[]
        for kind,pl in re.findall(r'<gml:(exterior|interior)>.*?<gml:posList[^>]*>([^<]*)</gml:posList>',patch,re.S):
            v=pl.split(); utm=[(float(v[i]),float(v[i+1])) for i in range(0,len(v),2)]
            if tol: utm=dp(utm,tol)
            pts=[utm2ll(e,n) for e,n in utm]
            if kind=='exterior': rings.insert(0,pts)
            else: rings.append(pts)
        if rings: polys.append(rings)
    return polys
def geom(polys):
    if not polys: return None
    return {'type':'Polygon','coordinates':polys[0]} if len(polys)==1 else {'type':'MultiPolygon','coordinates':polys}
USE={'1_residential':'Residencial','2_agriculture':'Agrario','3_industrial':'Industrial','4_1_office':'Oficinas','4_2_retail':'Comercial','4_3_publicServices':'Servicios públicos'}
COND={'functional':'funcional','declined':'deteriorado','ruin':'ruina'}
index=[]
for code,name in MUNIS.items():
    zf=zipfile.ZipFile(f'{S}/cat/A.ES.SDGC.CP.{code}.zip'); x=dec(zf.read(f'A.ES.SDGC.CP.{code}.cadastralparcel.gml'))
    parcels=[]; minx=miny=1e9; maxx=maxy=-1e9
    for m in re.finditer(r'<cp:CadastralParcel (.*?)</cp:CadastralParcel>',x,re.S):
        b=m.group(1); rc=re.search(r'<cp:nationalCadastralReference>([^<]+)<',b).group(1).strip()
        area=re.search(r'<cp:areaValue[^>]*>([\d.]+)<',b); lab=re.search(r'<cp:label>([^<]*)<',b)
        g=geom(rings_from(b))
        if not g: continue
        for poly in ([g['coordinates']] if g['type']=='Polygon' else g['coordinates']):
            for p in poly[0]:
                minx=min(minx,p[0]); maxx=max(maxx,p[0]); miny=min(miny,p[1]); maxy=max(maxy,p[1])
        parcels.append({'rc':rc,'a':float(area.group(1)) if area else None,'l':lab.group(1).strip() if lab else '','g':g})
    # buildings
    bld={}
    try:
        zb=zipfile.ZipFile(f'{S}/cat/A.ES.SDGC.BU.{code}.zip'); bx=dec(zb.read(f'A.ES.SDGC.BU.{code}.building.gml'))
        px=dec(zb.read(f'A.ES.SDGC.BU.{code}.buildingpart.gml'))
        floors={}
        for m in re.finditer(r'<bu-ext2d:BuildingPart gml:id="ES.SDGC.BU.([^"_]+)_[^"]*">(.*?)</bu-ext2d:BuildingPart>',px,re.S):
            fl=re.search(r'<bu-ext2d:numberOfFloorsAboveGround>(\d+)<',m.group(2))
            if fl: floors[m.group(1)]=max(floors.get(m.group(1),0),int(fl.group(1)))
        for m in re.finditer(r'<bu-ext2d:Building gml:id="ES.SDGC.BU.([^"]+)">(.*?)</bu-ext2d:Building>',bx,re.S):
            rc=m.group(1); b=m.group(2)
            def g1(pat):
                r=re.search(pat,b); return r.group(1).strip() if r else None
            yr=g1(r'<bu-core2d:beginning>(\d{4})'); use=g1(r'<bu-ext2d:currentUse>([^<]*)<'); cond=g1(r'<bu-core2d:conditionOfConstruction>([^<]*)<')
            rec={'u':USE.get(use,use),'c':COND.get(cond,cond),'y':int(yr) if yr and yr!='0001' else None,'n':g1(r'<bu-ext2d:numberOfBuildingUnits>(\d+)<'),'d':g1(r'<bu-ext2d:numberOfDwellings>(\d+)<'),'f':floors.get(rc),'a':g1(r'<bu-ext2d:value uom="m2">([\d.]+)<'),'g':geom(rings_from(b))}
            rec={k:v for k,v in rec.items() if v not in (None,'')}
            bld.setdefault(rc[:14],[]).append(rec)
    except Exception as e: print(code,'BU error',e)
    # addresses
    addr={}
    try:
        za=zipfile.ZipFile(f'{S}/cat/A.ES.SDGC.AD.{code}.zip'); ax=dec(za.read(f'A.ES.SDGC.AD.{code}.gml'))
        tn={}
        for m in re.finditer(r'<AD:ThoroughfareName gml:id="ES.SDGC.TN.([^"]+)">(.*?)</AD:ThoroughfareName>',ax,re.S):
            t=re.search(r'<GN:text>([^<]*)<',m.group(2)); tn[m.group(1)]=re.sub(r'\s+',' ',t.group(1)).strip() if t else ''
        for m in re.finditer(r'<AD:Address gml:id="ES.SDGC.AD\.([^"]+)">(.*?)</AD:Address>',ax,re.S):
            lid=m.group(1); parts=lid.split('.')   # 50.049.10.1.0049202XM7904G
            if len(parts)<5: continue
            rc=parts[-1][:14]; num=re.search(r'<AD:LocatorDesignator>\s*<AD:designator>([^<]*)<',m.group(2)); tnid='.'.join(parts[:3])
            s=(tn.get(tnid,'')+' '+(num.group(1).strip() if num else '')).strip()
            if s and s not in addr.setdefault(rc,[]): addr[rc].append(s)
        addr={k:'; '.join(v[:4]) for k,v in addr.items()}
    except Exception as e: print(code,'AD error',e)
    out={'code':code,'name':name,'bbox':[round(minx,5),round(miny,5),round(maxx,5),round(maxy,5)],'fecha':'Catastro INSPIRE ATOM, actualización 2026-02','parcels':parcels,'bld':bld,'addr':addr}
    s=json.dumps(out,ensure_ascii=False,separators=(',',':'))
    os.makedirs(OUT,exist_ok=True); open(f'{OUT}/{code}.json','w',encoding='utf8').write(s)
    # zone (polígono / manzana) bounding boxes for a tighter "is this municipality in view" test
    zx=dec(zf.read(f'A.ES.SDGC.CP.{code}.cadastralzoning.gml')); zones=[]
    for m in re.finditer(r'<cp:CadastralZoning (.*?)</cp:CadastralZoning>',zx,re.S):
        pl=re.findall(r'<gml:posList[^>]*>([^<]*)</gml:posList>',m.group(1))
        if not pl: continue
        xs=[];ys=[]
        for s_ in pl:
            v=s_.split()
            for i in range(0,len(v),2): xs.append(float(v[i])); ys.append(float(v[i+1]))
        lo=utm2ll(min(xs),min(ys)); hi=utm2ll(max(xs),max(ys)); zones.append([round(lo[0],4),round(lo[1],4),round(hi[0],4),round(hi[1],4)])
    index.append({'code':code,'name':name,'bbox':out['bbox'],'zones':zones,'n':len(parcels),'nb':sum(len(v) for v in bld.values())})
    print(code,name,'parcels',len(parcels),'buildings',sum(len(v) for v in bld.values()),'addr',len(addr),'bytes',len(s))
json.dump({'fecha':'2026-09-07','munis':index},open(f'{OUT}/index.json','w',encoding='utf8'),ensure_ascii=False,separators=(',',':'))
print('index written')

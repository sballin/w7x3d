import requests
import json
 
db = 'http://esb.ipp-hgw.mpg.de:8280/services/ComponentsDbRest/'
#coilConfigs = 'http://esb.ipp-hgw.mpg.de:8280/services/CoilsDBRest/configs'

directory = requests.get(db+'components').json()

for i, _ in enumerate(directory):
    if i < 336:
        continue
    print(f'{i}/{len(directory)}')
    r = requests.get(f'{db}component/{i}/data')
    if r.ok:
        with open('components/%d.json' % i, 'w') as f:
            f.write(r.text)

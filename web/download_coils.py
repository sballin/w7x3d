import requests
import json
 
db = 'http://esb.ipp-hgw.mpg.de:8280/services/CoilsDBRest/'
#coilConfigs = 'http://esb.ipp-hgw.mpg.de:8280/services/CoilsDBRest/configs'

directory = requests.get(db+'coils').json()

for i, _ in enumerate(directory):
    print(f'{i}/{len(directory)}')
    r = requests.get(f'{db}coil/{i}/data', timeout=100)
    if r.ok:
        with open('/Users/sean/Desktop/coils/%d.json' % i, 'w') as f:
            f.write(r.text)

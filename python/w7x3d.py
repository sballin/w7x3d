import os
from os.path import join, isfile, isdir, dirname
import shutil
import glob
import requests
from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import numpy as np
import webbrowser


class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            if self.path == '/':
                self.path = 'index.html'
            if self.path[0] == '/':
                self.path = self.path[1:]
            if self.path == 'is_running':
                
                return
            with open(join('scene_html', self.path), 'rb') as f:
                self.send_response(200)
                self.end_headers()
                self.wfile.write(f.read())
        except Exception as e:
            print(self.path, join('scene_html', self.path), e)
            self.send_response(404)
            self.end_headers()
           

class Scene():
    def __init__(self):
        self.scene = {'background': 'white',
                      'camera_position': [10, 10, 10],
                      'camera_target': [0, 0, 0]}
        
    def add_line(self, x, y, z, color='black'):
        pass
        
    def add_point(self, x, y, z, radius=0.005, phi=None):
        pass
        
    def add_points(self, x, y, z, radius=0.005, phi=None):
        pass
        
    def add_json(self, json):
        pass
        
    def download_by_number(self, number):
        pass
        
    def saveLCFSjson(self):
        toroidal_angles = [round(t, 5) for t in np.arange(0, 2*np.pi, 0.025).tolist()]
        base_url = 'http://svvmec1.ipp-hgw.mpg.de:8080/vmecrest/v1/geiger/w7x/'

        config_dict = {'A_standard_beta-0':        '1000_1000_1000_1000_+0000_+0000/01/00jh_l/',
                       'A_standard_beta-0.056':    '1000_1000_1000_1000_+0000_+0000/01/32/',
                       'B-low-iota_beta-0':        '1000_1000_1000_1000_+0750_+0750/01/00/',
                       'B_low-iota_beta-0.021':    '1000_1000_1000_1000_+0750_+0750/01/10ss/',
                       'C_high-iota_beta-0':       '1000_1000_1000_1000_-0690_-0690/01/00/',
                       'C_high-iota_beta-0.021':   '1000_1000_1000_1000_-0690_-0690/01/10s/',
                       'D_low-mirror_beta-0':      '1042_1042_1127_1127_+0000_+0000/01/00/',
                       'D_low-mirror_beta-0.043':  '1042_1042_1127_1127_+0000_+0000/01/20/',
                       'E_high-mirror_beta-0':     '0972_0926_0880_0852_+0000_+0000/01/00jh/',
                       'E_high-mirror_beta-0.053': '0972_0926_0880_0852_+0000_+0000/01/24a/'}
                   
        for config_name, config_url in config_dict.items():
            print(config_name)
            lcfs_rs = []
            lcfs_zs = []
            for i, phi in enumerate(toroidal_angles):
                with urllib.request.urlopen(base_url + config_url + 'lcfs.json?phi=' + str(round(phi*180/np.pi, 5))) as url:
                    data = json.loads(url.read().decode())
                    lcfs_rs.extend(list(data['lcfs'][0]['x1']))
                    lcfs_zs.extend(list(data['lcfs'][0]['x3']))
                print(i)
                    
            lcfs_rs = [round(l, 5) for l in lcfs_rs]
            lcfs_zs = [round(l, 5) for l in lcfs_zs]

            with open('assets/lcfs_{}.json'.format(config_name), 'w') as f:
                f.write(json.dumps({"name": config_name, "r": lcfs_rs, "z": lcfs_zs, "phi": toroidal_angles}, separators=(',', ':')))


    def view_scene(self):
        """
        Opens scene in web browser.
        """
        if not isdir('scene_html'):
            os.mkdir('scene_html')
            
        # Copy required javascript files
        libdir = dirname(__file__)
        for filepath in glob.glob(join(libdir, 'js', '*')):
            filename = os.path.split(filepath)[-1]
            dest = join('scene_html', filename)
            if not isfile(dest):
                shutil.copy2(filepath, dest)
            
        # Download 3D model files required by scene
        downloads_required = False
        if downloads_required:
            if not isdir(join('scene_html', 'data')):
                os.mkdir(join('scene_html', 'data'))
            else:
                for dl in downloads_required:
                    download_by_number(number)
                pass # if already downloaded stuff we need
            
        # Populate template and output finished file to scene directory
        with open(join(libdir, 'template.html'), 'r') as f:
            template = f.read()
        output = template.replace('{{scene}}', scene)
        with open(join('scene_html', 'index.html'), 'w') as f:
            f.write(output)

        # Start serving page and open in browser
        # httpd = HTTPServer(('localhost', 9000), SimpleHTTPRequestHandler)
        # webbrowser.open_new_tab('http://localhost:9000')
        # httpd.serve_forever()

    def to_json(self):
        pass

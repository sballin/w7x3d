import os
from os.path import join, isfile, isdir, dirname
import shutil
import glob
import requests
import json
import numpy as np
import webbrowser
           

class Scene:
    def __init__(self, jsonFilename=None):
        # Simple dictionary describing scene
        self.scene = {'background': 'white',
                      'camera_position': [10, 10, 10],
                      'camera_target': [0, 0, 0]}   
                      
        # More complicated JSON that can be loaded by web viewer
        if jsonFilename:
            self.loadJSON(jsonFilename)
        else:
            self.json = {}
        
    def addLine(self, x, y, z, color='black'):
        pass
        
    def addPoint(self, x, y, z, radius=0.005, phi=None):
        pass
        
    def addPoints(self, x, y, z, radius=0.005, phi=None):
        pass
        
    def addJSON(self, json):
        pass
        
    def downloadByNumber(self, number):
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


    def loadJSON(self, filename):
        with open(filename, 'r') as f:
            self.json = json.load(f)
        
    def writeJSON(self):
        pass
        
    def view(self):
        """
        Opens scene in web browser.
        """
        with open('../js/three.min.js', 'r') as f:
            threejs = f.read()
        with open('../js/controls/OrbitControls.js', 'r') as f:
            orbitControls = f.read()
        with open('../js/loaders/deprecated/legacyJSONloader.js', 'r') as f:
            legacyJSONloader = f.read()
        
        # Populate template and output finished file to scene directory
        with open('template_json.html', 'r') as f:
            template = f.read()
        output = template.replace('{{threejs}}', threejs)
        output = output.replace('{{orbitControls}}', orbitControls)
        output = output.replace('{{legacyJSONloader}}', legacyJSONloader)
        output = output.replace('{{json}}', json.dumps(self.json))
        with open('index.html', 'w') as f:
            f.write(output)
            
        webbrowser.open('file://' + os.path.join(os.getcwd(), 'index.html'))


    def viewOld(self):
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

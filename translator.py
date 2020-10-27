# Copyright 2020 Zijian Zhang
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# 	http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

'''
Used to convert Plaintext pattern files (.cells) to collection Javascript files supported by this repo.
Introduction to Plaintext pattern file (.cells): https://www.conwaylife.com/wiki/Plaintext
'''

import json
import os

const dest_file = 'dest.js' # The collection Javascript file to generate
const src = 'src' # Source folder
const name = 'custom' # Name of your collection

files = {i[:-6]: [j for j in open(src + '/' + i).readlines() if j[0] != '!'] for i in os.listdir(src)}

for i in files:
    for j in range(len(files[i])):
        tmp = []
        for k in files[i][j]:
            if k == '.':
                tmp.append(0)
            elif k == 'O':
                tmp.append(1)
        files[i][j] = tmp

open(dest_file, 'w').write('const  = ' + json.dumps(files, sort_keys=True) + ';')

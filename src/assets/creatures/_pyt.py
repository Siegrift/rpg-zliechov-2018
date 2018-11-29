from os import listdir

files = sorted(listdir('.'))[1:]
s = '[\n'
for f in files:
    s += "{ image: require('./assets/creatures/%s') },\n" % f

s += ']\n'

print(s)

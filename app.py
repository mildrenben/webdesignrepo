#!/usr/bin/env python
import json
import pystache

db   = open('db.json')
data = json.load(db)
db.close()

renderer = pystache.Renderer()
final = renderer.render_path("templates/index.mustache", {
	'rows':data
})

rendered = open('build/index.html','w')
rendered.write(final)
rendered.close()

db.close()
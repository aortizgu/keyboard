import xmlrpc.client

with xmlrpc.client.ServerProxy("http://localhost:8001/") as proxy:
    print("ret: %s" % str(proxy.SetMsgToPanels("hola")))

from xmlrpc.server import SimpleXMLRPCServer
from xmlrpc.server import SimpleXMLRPCRequestHandler

# Restrict to a particular path.
class RequestHandler(SimpleXMLRPCRequestHandler):
    rpc_paths = ('/',)

# Create server
with SimpleXMLRPCServer(('0.0.0.0', 8001),
                        requestHandler=RequestHandler) as server:
    server.register_introspection_functions()
    def my_func(x):
        print ("Set message ", x)
        return "OK"
    server.register_function(my_func, 'SetMsgToPanels')
    # Run the server's main loop
    server.serve_forever()
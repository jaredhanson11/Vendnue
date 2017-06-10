from pprint import pprint

def error(error_message, status_code=400):
    assert(isinstance(error_message,str))
    # pprint({'error': error_message});
    return ({'error':error_message}, status_code, {'Content-Type':'application/json'})

def success(data_dict, status_code=200):
    assert(isinstance(data_dict,dict))
    # pprint(data_dict);
    return (data_dict, status_code, {'Content-Type':'application/json'})

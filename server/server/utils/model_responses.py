def error(error_message):
    assert(isinstance(error_message, str))
    return {'error' : error_message}

def success(data_dict):
    assert(isinstance(data_dict, dict))
    return data_dict

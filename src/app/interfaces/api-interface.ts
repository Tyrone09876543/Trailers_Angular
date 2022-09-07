export interface loginResponse {
    non_field_errors: string[];
    ok:               boolean;
    username:         string[];
    password:         string[];
    user:             string;
    email:            string;
    first_name:       string;
    last_name:        string;
    token:            string;
}
export interface getUserResponse {
    ok:               boolean;
    username:         string;
    email:            string;
    first_name:       string;
    last_name:        string;
}
export interface changePasswordResponse {
    ok:               boolean;
    oldP:         string[];
    newP:         string[];
}

export interface categoryResponse {
    categories: Category[];
    ok:         boolean;
}

export interface Category {
    id:   number;
    name: string;
}
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
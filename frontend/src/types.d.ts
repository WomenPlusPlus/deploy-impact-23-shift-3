type Skills = {
  skill_name: string;
};

type Associations = {
  name: string;
  main_focus: string;
  association_id: number;
};

type LoginError = {
  error: string;
  error_description: string;
};

type SignupError = {
  code: number;
  msg: string;
};

type Credentials = {
  email: string,
  password: string
};

variable "aws_rds_pass" {
  description = "RDS postgress password"
  type = string
  sensitive = true
}

variable "aws_rds_username" {
  description = "RDS postgress username"
  type = string
}

variable "rds_identifier" {
  description = "RDS postgress database name"
  type = string
  default = "rds-postgress"
}
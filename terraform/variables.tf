variable "aws_region" {
  description = "AWS Region for resources"
  type        = string
  default     = "us-east-1"
}

variable "aws_default_profile" {
  description = "AWS Default profile being used"
  type        = string
  default     = "adoringvirus"
}

variable "aws_rds_pass" {
  description = "rds postgress password"
  type = string
  sensitive = true
}

variable "aws_rds_user" {
  description = "rds postgress username"
  type = string
  sensitive = true
}

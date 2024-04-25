provider "aws" {
  region  = var.aws_region
  profile = var.aws_default_profile
}

module "rds_instance" {
  source = "./modules/rds"

  rds_identifier   = "rds-postgress-db"
  aws_rds_pass     = var.aws_rds_pass
  aws_rds_username = var.aws_rds_user
}

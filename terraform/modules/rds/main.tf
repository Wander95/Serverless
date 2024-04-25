resource "aws_db_instance" "rds_instance" {
  allocated_storage    = 20
  #db_subnet_group_name = "db-subnetgrp"
  engine               = "postgres"
  engine_version       = "11.5"
  identifier           = var.rds_identifier
  instance_class       = "db.t2.micro"
  skip_final_snapshot  = true
  storage_encrypted    = false
  publicly_accessible  = true
  apply_immediately    = true
  password             = var.aws_rds_pass
  username             = var.aws_rds_username
}
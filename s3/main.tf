terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.9"
    }
  }
}

provider "aws" {
    // Config for the AWS provider would go here,
    // but we don't need any!
}


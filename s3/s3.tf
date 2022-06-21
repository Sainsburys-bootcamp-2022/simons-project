resource "aws_s3_bucket" "example_bucket" {
  bucket        = "simon-powell-example-bucket"
  force_destroy = true
}

#!/bin/sh

npm run build && aws s3 sync build s3://costsaving-react
#!/bin/bash

# Run the node build
npm run build

# Deploy to subdomain
cp build/* /var/subnotes/${USER}/ -rf

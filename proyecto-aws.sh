#!/bin/bash

# Configura las variables
BUCKET_NAME="proyecto-cencosud-alke"
REGION="us-east-1"  # Cambia esto según tu región
DEFAULT_ROOT_OBJECT="index.html"
PROFILE="admin"  # Cambia esto si utilizas un perfil diferente
BUILD_DIR="./dist"  # Cambia esto si tu directorio de construcción es diferente

# 1. Crear el bucket en S3 (si no existe)
echo "Creando el bucket S3: $BUCKET_NAME"
aws s3api create-bucket --bucket "$BUCKET_NAME" --region "$REGION" --create-bucket-configuration LocationConstraint="$REGION" --profile "$PROFILE"

# 2. Configurar el bucket para alojamiento de sitios web estáticos
echo "Configurando el bucket S3 para alojamiento de sitios web estáticos"
aws s3 website s3://"$BUCKET_NAME"/ --index-document "$DEFAULT_ROOT_OBJECT" --error-document "$DEFAULT_ROOT_OBJECT" --region "$REGION" --profile "$PROFILE"

# 3. Configurar el control de acceso público del bucket
echo "Configurando el control de acceso público del bucket S3"
aws s3api put-public-access-block --bucket "$BUCKET_NAME" --public-access-block-configuration '{
    "BlockPublicAcls": false,
    "IgnorePublicAcls": false,
    "BlockPublicPolicy": false,
    "RestrictPublicBuckets": false
}' --profile "$PROFILE"

# 4. Aplicar la política del bucket
echo "Aplicando la política del bucket S3"
aws s3api put-bucket-policy --bucket "$BUCKET_NAME" --policy '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::'"$BUCKET_NAME"'/*"
    }
  ]
}' --profile "$PROFILE"

# 5. Revisar la configuración de acceso público
echo "Revisando la configuración de acceso público del bucket S3"
aws s3api get-public-access-block --bucket "$BUCKET_NAME" --profile "$PROFILE"

# 6. Revisar la política del bucket
echo "Revisando la política del bucket S3"
aws s3api get-bucket-policy --bucket "$BUCKET_NAME" --profile "$PROFILE"

# 7. Construir el proyecto
echo "Construyendo el proyecto"
npm run build

# 8. Subir archivos al bucket S3
echo "Subiendo archivos al bucket S3 desde $BUILD_DIR"
aws s3 sync "$BUILD_DIR" s3://"$BUCKET_NAME" --profile "$PROFILE"

echo "Script completado."

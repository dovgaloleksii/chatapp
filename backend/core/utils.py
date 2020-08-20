import uuid
from io import BytesIO
from typing import Optional, Tuple

import requests
from PIL import Image
from django.core.files.base import ContentFile
from django.core.files.uploadedfile import InMemoryUploadedFile


def get_image_by_src(src: str) -> Tuple[Optional[InMemoryUploadedFile], Optional[str]]:
    image = None
    image_name = None
    image_request = requests.get(src, stream=True)

    try:
        if image_request.ok:
            with Image.open(image_request.raw) as img:
                buffer = BytesIO()
                img.save(fp=buffer, format=img.format)
                content_image = ContentFile(buffer.getvalue())
                image_name = f'{img.filename or str(uuid.uuid4())}.{img.format.lower()}'
                image = InMemoryUploadedFile(
                    file=content_image,
                    field_name=None,
                    name=image_name,
                    size=img.size,
                    content_type=Image.MIME[img.format],
                    charset=None,
                )
    finally:
        image_request.close()

    return image, image_name

from io import BytesIO
import blurhash
import requests


def getBlurCodeFromImage(imageUrl):
    image = getImageBytes(imageUrl)
    return blurhash.encode(image, x_components=4, y_components=6)

def getImageBytes(imageUrl):
    headers = headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Cafari/537.36'}

    pic = requests.get(imageUrl, headers=headers)

    return BytesIO(pic.content)

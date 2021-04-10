import os
from PIL import Image
from flask import url_for, current_app

def add_poem_pic(pic_upload, user_id, poem_title, poem_tag):

    title_len = 5 if len(poem_title) >=5 else len(poem_title)
    filename = pic_upload.filename
    ext_type = filename.split('.')[-1]
    storage_filename = f'poem_{poem_tag}_{user_id}_{poem_title[:title_len]}' \
                        f'.{ext_type}'
    filepath = os.path.join(current_app.root_path, 'static/poem_pics',
                            storage_filename)
    output_size = (200,200)

    pic = Image.open(pic_upload)
    pic.thumbnail(output_size)
    pic.save(filepath)

    return storage_filename

# Generated by Django 3.2.3 on 2021-07-07 15:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0003_hevents'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='HServices',
            new_name='Event',
        ),
        migrations.RenameModel(
            old_name='HomeSlider',
            new_name='HeroSlide',
        ),
        migrations.RenameModel(
            old_name='HEvents',
            new_name='Service',
        ),
    ]
# Generated by Django 2.0.2 on 2018-02-21 13:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='study',
            name='referring_physician_name',
        ),
        migrations.AddField(
            model_name='study',
            name='referring_physician',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Referring Physician'),
        ),
    ]
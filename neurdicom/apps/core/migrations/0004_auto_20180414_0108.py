# Generated by Django 2.0.2 on 2018-04-14 01:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_auto_20180407_1916'),
    ]

    operations = [
        migrations.AddField(
            model_name='plugin',
            name='display_name',
            field=models.CharField(default='', max_length=150, verbose_name='Display Name'),
        ),
        migrations.AddField(
            model_name='plugin',
            name='type',
            field=models.CharField(default='ANALYZER', max_length=40, verbose_name='Type'),
        ),
    ]
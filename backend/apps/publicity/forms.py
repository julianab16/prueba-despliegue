from django import forms
from .models import Publicity

class PublicityForm(forms.ModelForm):
    class Meta:
        model = Publicity
        fields = [ 'image']
    
    def clean(self):
        cleaned_data = super().clean()
        start_date = cleaned_data.get('start_date')
        end_date = cleaned_data.get('end_date')

        if start_date and end_date and start_date > end_date:
            raise forms.ValidationError("The start date cannot be after the end date.")
        
        return cleaned_data
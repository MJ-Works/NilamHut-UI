import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function StartDateValidator(name : string) : ValidatorFn
{
    return (c: AbstractControl): {[key: string]: any} => {
        if(c.value == null || c.value.length == 0)
            return null;
            
       var currentDate = new Date();
       var selectedDate = new Date(c.value);
       if(selectedDate >= currentDate) return null;
       return {'startDateValid' : true};
    };
}
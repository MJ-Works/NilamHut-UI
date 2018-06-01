import { ValidatorFn, AbstractControl, ValidationErrors, FormControl } from "@angular/forms";

export function EndDateValidator(name : string) : ValidatorFn
{
    return (c: AbstractControl): {[key: string]: any} => {
        if(c.value === null || c.value.length === 0)
            return null;
        
      var startDate;
      var selectedDate;
      if(name === "StartDateTime")
      {
          selectedDate = new Date(c.value);
          if(c.root.get(name).value === '') return {'endDateValid' : true};
          startDate = new Date(c.root.get(name).value);
          if(selectedDate > startDate) return null;
          else return {'endDateValid' : true};
      }
      else 
      {
        startDate = new Date(c.value);
        if(c.root.get(name).value === '')
        {
            c.root.get(name).setErrors({'endDateValid' : true});
            return null;
        }
        selectedDate = new Date(c.root.get(name).value);
        if(selectedDate > startDate) return null;
        else {
            c.root.get(name).setErrors({'endDateValid' : true});
            return null;
        }
      }
    };
}
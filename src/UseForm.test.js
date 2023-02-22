import {render,screen} from '@testing-library/react';
import user from '@testing-library/user-event';
import UserForm from './UserForm';

test('it shows two input and button',()=>{
    //render the component 
    render(<UserForm/>)

    //Manipulate the component or Find an element in it
    const inputs=screen.getAllByRole('textbox');
    const button=screen.getByRole('button');

    //Assertion-Make sure the component is doing what we expect to do

    expect(inputs).toHaveLength(2);
    expect(button).toBeInTheDocument();
})

test('it calls onUserAdd when the form is submitted', () => {
    //NOT THE BEST IMPLEMENTATION
    const argList=[];
    const callback=(...args) => {
        argList.push(args);
    }
    //Try to render the component
    render(<UserForm onUserAdd={callback}/>)

    //Find the two inputs
// const input = screen.getAllByRole('textbox') //but here i have a two input that for name and email soi destructure that
const [nameInput,emailInput] = screen.getAllByRole('textbox');
    //Simulates typing in a name
user.click(nameInput);
user.keyboard('santhosh');
    //Simulates typing in a email
    user.click(emailInput);
    user.keyboard('santhosh@gmail.com');
    //Find the button
const button =screen.getByRole('button');
    //Simulating clicking the button
    user.click(button);

    //Assertion to make sure the "onUserAdd" gets called with name and email
    expect(argList).toHaveLength(1);
    expect(argList[0][0]).toEqual({name:'santhosh',email:'santhosh@gmail.com'});
     
})

//Instead of using argList and callback function use mock function
test('it calls onUserAdd when the form is submitted', () => {
 //Try to render the component
 const mock =jest.fn();
 render(<UserForm onUserAdd={mock}/>)

 //Find the two inputs
// const input = screen.getAllByRole('textbox') //but here i have a two input that for name and email soi destructure that
const nameInput = screen.getByRole('textbox',{
    name:/name/i,
});
const emailInput = screen.getByRole('textbox',{
    name:/email/i,
});
 //Simulates typing in a name
user.click(nameInput);
user.keyboard('santhosh');
 //Simulates typing in a email
 user.click(emailInput);
 user.keyboard('santhosh@gmail.com');
 //Find the button
const button =screen.getByRole('button');
 //Simulating clicking the button
 user.click(button);

 //Assertion to make sure the "onUserAdd" gets called with name and email
 expect(mock).toHaveBeenCalled();
 expect(mock).toHaveBeenCalledWith({name:'santhosh',email:'santhosh@gmail.com'});
  
})
test('empty the two input fields', ()=>{
    render(<UserForm onUserAdd={()=>{}}/>)
    const nameInput =screen.getByRole('textbox',{name:/name/i});
    const emailInput = screen.getByRole('textbox',{name:/email/i});
    const button=screen.getByRole('button');
    user.click(nameInput);
    user.keyboard('santhosh');
    user.click(emailInput);
    user.keyboard('santhosh@gmail.com');
    user.click(button);
    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
})
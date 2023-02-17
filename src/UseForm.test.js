import {render,screen} from '@testing-library/react';
import User from '@testing-library/user-event';
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
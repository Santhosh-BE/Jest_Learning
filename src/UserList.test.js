import {getByRole, render,screen,within} from '@testing-library/react';
import user from '@testing-library/user-event';
import UserList from './UserList';

function renderComponent() {
    const users=[
        {name: 'santhosh',email: 'santhosh@gmail.com'},
        {name: 'ranjith',email: 'ranjith@gmail.com'}
    ];
    render(<UserList users={users} />)
    return {
        users,
    }
}
test('should render one value in a row',()=>{
renderComponent();
// const rows=screen.getAllByRole('row');
const rows=within(screen.getByTestId('users')).getAllByRole('row');
expect(rows).toHaveLength(2);
// screen.logTestingPlaygroundURL();
}) 

test('should render name and email',()=>{
const {users}=renderComponent();
for(let user of users) {
    const name=screen.getByRole('cell', {name:user.name})
    const email=screen.getByRole('cell', {name:user.email})

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
}
});
import React, { useEffect, useState, useCallback } from 'react';
import { requestGet, requestDelete } from '../services/request';

function UsersTable() {
  const [usersList, setUsersList] = useState([]);

  const getUsers = useCallback(async () => {
    try {
      const users = await requestGet('/user');
      setUsersList(users);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, [usersList]);

  const removeUser = useCallback(async (id) => {
    try {
      await requestDelete(`/user/${id}`);
      await getUsers();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <div>
      <h2>Lista de usuários</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          { usersList.map((item, index) => {
            const { id, name, email, role } = item;
            return (
              <tr key={ index }>
                <td
                  data-testid={ `admin_manage__element-user-table-item-number-${index}` }
                >
                  {index + 1}
                </td>
                <td data-testid={ `admin_manage__element-user-table-name-${index}` }>
                  {name}
                </td>
                <td data-testid={ `admin_manage__element-user-table-email-${index}` }>
                  {email}
                </td>
                <td data-testid={ `admin_manage__element-user-table-role-${index}` }>
                  {role}
                </td>
                <td>
                  <button
                    data-testid={ `admin_manage__element-user-table-remove-${index}` }
                    type="button"
                    onClick={ () => removeUser(id) }
                  >
                    Excluir
                  </button>
                  {}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;

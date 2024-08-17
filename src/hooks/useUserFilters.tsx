import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, searchUsersThunk, setError, clearUsers  } from '../redux/features/slices/userSlice';
import { AppDispatch, RootState } from '../redux/store';
import { validateSearchCriteria } from '../utils/validateSearchCriteria';

const useUserFilters = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterStatus, setFilterStatus] = useState<'' | 'active' | 'inactive'>('');
  const dispatch = useDispatch<AppDispatch>();
  const { users, error } = useSelector((state: RootState) => state.user);

  const fetchAndClearErrors = useCallback(() => {
    dispatch(fetchUsers());
    dispatch(setError(null));
  }, [dispatch]);

  const handleSearch = useCallback(() => {

    if (!searchQuery.trim()) {
      fetchAndClearErrors();
      return;
    }

    const { queryParams, error } = validateSearchCriteria(searchQuery);

    if (error) {
      dispatch(setError(error)); 
      dispatch(clearUsers()); 
      return;
    }

    dispatch(setError(null)); 
    dispatch(searchUsersThunk(queryParams || {}));
  }, [searchQuery, fetchAndClearErrors, dispatch]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      fetchAndClearErrors();
    }
  }, [searchQuery, fetchAndClearErrors]);

  return {
    searchQuery,
    setSearchQuery,
    sortOrder,
    setSortOrder,
    filterStatus,
    setFilterStatus,
    handleSearch,
    error,
    users,
  };
};

export default useUserFilters;

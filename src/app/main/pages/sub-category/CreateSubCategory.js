import * as React from 'react';
import { useState, useCallback, useEffect } from 'react'
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import subCategory from 'app/main/services/controller/sub-category';
import category from 'app/main/services/controller/category';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const Root = styled('div')(({ theme }) => ({
  '& .FaqPage-header': {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.primary.contrastText,
  },

  '& .FaqPage-panel': {
    margin: 0,
    border: 'none',
    '&:before': {
      display: 'none',
    },
    '&:first-of-type': {
      borderRadius: '20px 20px 0 0',
    },
    '&:last-of-type': {
      borderRadius: '0 0 20px 20px',
    },

    '&.Mui-expanded': {
      margin: 'auto',
    },
  },
}));

function CreateSubCategory() {
  const [formData, setFormData] = useState({
    color: '',
    title: '',
    categoryId: 0,
  })
  const [categories, setCategories] = useState()

  const navigate = useNavigate()

  const getCategories = useCallback(() => {
    category.list()
      .then(({ data }) => setCategories(data))
      .catch(error => console.log(error))
  }, [])

  useEffect(() => getCategories(), [getCategories])

  const handleFieldChange = (key, value) => {
    setFormData({ ...formData, [key]: value })
  }

  const renderHeader = () => {
    return (
      <React.Fragment>
        <Typography className="text-40 my-16 font-700" component="h1">
          Alt kategori oluştur
        </Typography>
        <Typography className="description">
          Aşağıdaki alanları doldurarak yeni bir alt kategori oluşturabilirsiniz.
        </Typography>
      </React.Fragment>
    )
  }

  const renderBreadcrumb = () => {
    return (
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Button color="inherit" href="/">Anasayfa</Button>
          <Button color="inherit" href="/pages/sub-categories">Alt kategoriler</Button>
          <Typography color="text.primary">Alt kategori oluştur</Typography>
        </Breadcrumbs>
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    subCategory.create({ ...formData })
      .then(() => {
        navigate('/pages/sub-categories')
      })
      .catch(error => console.log(error))
  }

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="outlined-basic"
                label="Alt kategori adı"
                variant="outlined"
                onChange={(e) => handleFieldChange('title', e.currentTarget.value)}
                value={formData.title}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="outlined-basic"
                label="Renk kodu"
                variant="outlined"
                onChange={(e) => handleFieldChange('color', e.currentTarget.value)}
                value={formData.color}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">Kategori</InputLabel>
                <Select
                  required
                  fullWidth
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={formData.categoryId}
                  label="Kategori"
                  onChange={(e) => handleFieldChange('categoryId', e.target.value)}
                >
                  {categories && categories.map((category) => (
                    <MenuItem
                      key={category.id}
                      value={category.id}
                      style={{ color: category.color }}
                    >
                      {category.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <div className='mt-20' style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Stack spacing={2} direction="row">
            <Button type="submit" color="info" variant="contained">Alt kategori oluştur</Button>
            <Button href="/pages/sub-categories" color="inherit">İptal</Button>
          </Stack>
        </div>
      </form>
    )
  }

  return (
    <Root className="w-full flex flex-col flex-auto">
      <div className="pl-60 pr-60 pt-20 pb-20">
        {renderBreadcrumb()}
        {renderHeader()}
        <div className='mt-20'>
          {renderForm()}
        </div>
      </div>
    </Root>
  );
}

export default CreateSubCategory;

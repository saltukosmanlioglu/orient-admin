import * as React from 'react';
import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import slider from 'app/main/services/controller/slider';
import product from 'app/main/services/controller/product';
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

function CreateSlider() {
  const [formData, setFormData] = useState({
    image: '',
    productId: 0,
  })

  const [products, setProducts] = useState()

  const navigate = useNavigate()

  const handleFieldChange = (key, value) => {
    setFormData({ ...formData, [key]: value })
  }

  const getProducts = () => {
    product.list()
      .then(({ data }) => setProducts(data))
      .then(error => console.log(error))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    slider.create({ ...formData })
      .then(() => {
        navigate('/pages/sliders')
      })
      .catch(error => console.log(error))
  }

  useEffect(() => getProducts(), [])

  const renderHeader = () => {
    return (
      <React.Fragment>
        <Typography className="text-40 my-16 font-700" component="h1">
          Slider oluştur
        </Typography>
        <Typography className="description">
          Aşağıdaki alanları doldurarak yeni bir slider oluşturabilirsiniz.
        </Typography>
      </React.Fragment>
    )
  }

  const renderBreadcrumb = () => {
    return (
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Button color="inherit" href="/">Anasayfa</Button>
          <Button color="inherit" href="/pages/sliders">Slider</Button>
          <Typography color="text.primary">Slider oluştur</Typography>
        </Breadcrumbs>
      </div>
    )
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
                variant="outlined"
                onChange={(e) => handleFieldChange('image', e.currentTarget.value)}
                value={formData.image}
                type="file"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">Ürün adı</InputLabel>
                <Select
                  required
                  fullWidth
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={formData.productId}
                  label="Ürün adı"
                  onChange={(e) => handleFieldChange('productId', e.target.value)}
                >
                  {products && products.map((product) => (
                    <MenuItem
                      key={product.id}
                      value={product.id}
                    >
                      {product.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <div className='mt-20' style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Stack spacing={2} direction="row">
            <Button type="submit" color="info" variant="contained">Slider oluştur</Button>
            <Button href="/pages/sliders" color="inherit">İptal</Button>
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

export default CreateSlider;

import * as React from 'react';
import { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import MuiAlert from '@mui/material/Alert';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import category from 'app/main/services/controller/category';
import subCategory from 'app/main/services/controller/sub-category';

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

function UpdateSubCategory() {
  const [formData, setFormData] = useState({
    categoryId: 0,
    color: '',
    title: '',
  })

  const [categories, setCategories] = useState()

  const [confirmationModal, setConfirmationModal] = useState(false)
  const [error, setError] = useState(false)

  const params = useParams()
  const navigate = useNavigate()

  const handleFieldChange = (key, value) => {
    setFormData({ ...formData, [key]: value })
  }

  const handleDelete = () => {
    subCategory.destroy(params.id)
      .then(() => {
        setConfirmationModal(false)
        navigate('/pages/sub-categories')
      })
      .catch(() => {
        setError(true)
        setConfirmationModal(false)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    subCategory.update(params.id, { ...formData })
      .then(() => {
        navigate('/pages/sub-categories')
      })
      .catch(error => {
        setError(true)
        console.log(error)
      })
  }

  useEffect(() => {
    category.list()
      .then(({ data }) => setCategories(data))
      .catch(error => console.log(error))
    subCategory.getById(params.id)
      .then(({ data }) => { setFormData(data) })
      .catch(error => console.log(error))
  }, [])

  const renderHeader = () => {
    return (
      <React.Fragment>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography className="text-40 my-16 font-700" component="h1">
            {formData.title}
          </Typography>
          <Button color="error" variant="contained" onClick={() => setConfirmationModal(true)}>Sil</Button>
        </div>
        <Typography className="description">
          Geçerli kaydı düzenleyebilir veya silebilirsiniz.
        </Typography>
      </React.Fragment>
    )
  }

  const renderBreadcrumb = () => {
    return (
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Button href="/">Anasayfa</Button>
          <Button href="/pages/sub-categories">Alt kategoriler</Button>
          <Typography color="text.primary">{formData.title}</Typography>
        </Breadcrumbs>
      </div>
    )
  }

  const renderForm = () => {
    return (
      <div className="mt-20">
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
            </Grid>
          </Box>
          <div className='mt-20' style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Stack spacing={2} direction="row">
              <Button type="submit" color="info" variant="contained">Güncelle</Button>
              <Button href="/pages/sub-categories" color="inherit">İptal</Button>
            </Stack>
          </div>
        </form>
      </div>
    )
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <React.Fragment>
      <Root className="w-full flex flex-col flex-auto">
        <div className="pl-60 pr-60 pt-20 pb-20">
          {renderBreadcrumb()}
          {renderHeader()}
          {renderForm()}
        </div>
        <Modal
          open={confirmationModal}
          onClose={() => setConfirmationModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Alt kategori sil
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Geçerli alt kategoriyi silmek istediğinizden emin misiniz ?
            </Typography>
            <div className="mt-16" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <ButtonGroup>
                <Button color="error" variant="contained" onClick={handleDelete}>Sil</Button>
                <Button color="inherit" variant="contained" onClick={() => setConfirmationModal(false)}>İptal</Button>
              </ButtonGroup>
            </div>
          </Box>
        </Modal>
      </Root>
      <Snackbar style={{ width: '25%', margin: '0 30px 30px auto', position: 'static', }} open={error} autoHideDuration={3000} onClose={() => setError(false)}>
        <Alert onClose={() => setError(false)} severity="error" sx={{ width: '100%' }}>
          İşlem gerçekleşmedi
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

export default UpdateSubCategory;

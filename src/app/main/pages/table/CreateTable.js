import * as React from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import table from 'app/main/services/controller/table';

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

function CreateTable() {
  const [formData, setFormData] = useState({
    title: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const navigate = useNavigate()

  const handleFieldChange = (key, value) => {
    setFormData({ ...formData, [key]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    table.create({ ...formData })
      .then(() => navigate('/pages/tables'))
      .catch(error => {
        setIsLoading(false)
        setError(true)
      })
      .finally(() => setIsLoading(false))
  }

  const renderHeader = () => {
    return (
      <React.Fragment>
        <Typography className="text-40 my-16 font-700" component="h1">
          Masa oluştur
        </Typography>
        <Typography className="description">
          Aşağıdaki alanları doldurarak yeni bir masa oluşturabilirsiniz.
        </Typography>
      </React.Fragment>
    )
  }

  const renderBreadcrumb = () => {
    return (
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Button color="inherit" href="/">Anasayfa</Button>
          <Button color="inherit" href="/pages/tables">Masalar</Button>
          <Typography color="text.primary">Masa oluştur</Typography>
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
                label="Masa adı"
                variant="outlined"
                onChange={(e) => handleFieldChange('title', e.currentTarget.value)}
                value={formData.title}
              />
            </Grid>
          </Grid>
        </Box>
        <div className='mt-20' style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Stack spacing={2} direction="row">
            <LoadingButton
              type="submit"
              color="info"
              loading={isLoading}
              variant="contained"
            >
              Masa oluştur
            </LoadingButton>
            <Button href="/pages/tables" color="inherit">İptal</Button>
          </Stack>
        </div>
      </form>
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
          <div className='mt-20'>
            {renderForm()}
          </div>
        </div>
      </Root>
      <Snackbar style={{ width: '25%', margin: '0 30px 30px auto', position: 'static', }} open={error} autoHideDuration={3000} onClose={() => setError(false)}>
        <Alert onClose={() => setError(false)} severity="error" sx={{ width: '100%' }}>
          İşlem gerçekleşmedi
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

export default CreateTable;

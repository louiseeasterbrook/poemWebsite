import "./poemForm.css";
import { Formik, Form } from "formik";
import { TextField, createTheme, ThemeProvider } from "@material-ui/core";
import * as Yup from "yup";

//modifed theme for input 'TextField'
const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
});

//function triggered on form submit
const UpdateForm = ({ updatePoem, setError, title, text, author }) => {
  const validationSchema = Yup.object({
    title: Yup.string().required("Title Required").max(40),
    author: Yup.string().required("Author Required"),
    text: Yup.string().required("Text Required"),
  });

  return (
    <div className="poemFormContainer">
      <ThemeProvider theme={theme}>
        <Formik
          initialValues={{ title: title, author: author, text: text }}
          onSubmit={(data) => {
            updatePoem(data);
            setError("");
          }}
          validationSchema={validationSchema}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            touched,
          }) => (
            <Form onSubmit={handleSubmit} className="poem-form">
              <TextField
                className="input-holder"
                placeholder="Title"
                name="title"
                type="input"
                as={TextField}
                variant="outlined"
                label="Title"
                required
                size="small"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.title && touched.title ? (
                <p className="form-error">{errors.title}</p>
              ) : (
                <></>
              )}

              <TextField
                className="input-holder"
                placeholder="Author"
                name="author"
                type="input"
                as={TextField}
                variant="outlined"
                label="Author"
                size="small"
                required
                value={values.author}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.author && touched.author ? (
                <p className="form-error">{errors.author}</p>
              ) : (
                <></>
              )}

              <TextField
                className="input-holder"
                placeholder="Poem Text"
                name="text"
                type="input"
                multiline
                as={TextField}
                variant="outlined"
                label="Poem Text"
                size="small"
                rows="5"
                required
                value={values.text}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.text && touched.text ? (
                <p className="form-error">{errors.text}</p>
              ) : (
                <></>
              )}
              <button className="form-btn" type="submit">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </ThemeProvider>
    </div>
  );
};

export default UpdateForm;

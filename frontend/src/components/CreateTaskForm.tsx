import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface CreateTaskFormProps {
    onCreate: (title: string) => Promise<void>;
    onClose: () => void;
}

const validationSchema = Yup.object({
    title: Yup.string()
        .trim()
        .required('Task title is required')
        .max(
            100,
            'Task title must be at most 100 characters'
        ),
});

function CreateTaskForm({
    onCreate,
    onClose,
}: CreateTaskFormProps) {
    return (
        <Formik
            initialValues={{
                title: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (
                values,
                { resetForm, setStatus }
            ) => {
                setStatus('');
                try {
                    await onCreate(values.title);
                    resetForm();
                    onClose();
                } catch {
                    setStatus('Failed to create task');
                }
            }}
        >
            {({ isSubmitting, status }) => (
                <Form className="create-task-form">
                    {status && (
                        <div className="create-task-api-error">
                            {status}
                        </div>
                    )}
                    <div className="create-task-field">
                        <label htmlFor="title">
                            Task title
                        </label>

                        <Field
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Enter a task title"
                        />

                        <ErrorMessage
                            name="title"
                            component="div"
                            className="create-task-error"
                        />
                    </div>

                    <div className="create-task-actions">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? 'Adding...'
                                : 'Add Task'}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default CreateTaskForm;
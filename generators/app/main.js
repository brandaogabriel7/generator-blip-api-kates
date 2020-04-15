import Generator from 'yeoman-generator';

import files from './files';
import { validateEmail, validateName, validateUsername } from './validate';

class OSSGenerator extends Generator {
    initializing() {
        this.log('Blip Api Kates Generator');
        this.log(
            "Made by Gabriel Rodrigues and based on Robert Achar's generator"
        );
        this.log();
    }

    prompting() {
        const done = this.async();

        const prompts = [
            {
                type: 'input',
                name: 'project',
                message: 'What is the name of your project?',
                default: 'blip-api'
            },
            {
                type: 'input',
                name: 'description',
                message: 'What is the description of your project?',
                default: 'An awesome project'
            },
            {
                type: 'input',
                name: 'name',
                message: 'What is your name?',
                validate: validateName,
                store: true
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is your email?',
                validate: validateEmail,
                store: true
            },
            {
                type: 'input',
                name: 'username',
                message: 'What is your GitHub username?',
                validate: validateUsername,
                store: true
            }
        ];

        this.prompt(prompts).then((props) => {
            this.props = props;
            done();
        });
    }

    writing() {
        this.log();
        this.log('🚀  Generating project...');
        this.log();

        const { project, description, name, email, username } = this.props;
        const templates = {
            project,
            description,
            name,
            email,
            username,
            year: new Date().getFullYear()
        };

        files.forEach((file) => {
            this.fs.copyTpl(
                this.templatePath(file.template),
                this.destinationPath(
                    file.destination.replace('{project}', project)
                ),
                templates
            );
        });
    }

    install() {
        this.log();
        this.log('📦  Installing dev dependencies...');
        this.log();

        this.npmInstall(
            [
                'eslint',
                'eslint-config-prettier',
                'eslint-plugin-prettier',
                'prettier'
            ],
            { 'save-dev': true }
        );

        this.log();
        this.log('...installing dependencies...');
        this.log();

        this.npmInstall(['express', 'swagger-jsdoc', 'swagger-ui-express']);
    }

    end() {
        this.log();
        this.log('🎉  Successfully generated!');
    }
}

export default OSSGenerator;

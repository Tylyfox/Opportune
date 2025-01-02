import { IsEmail, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateUserDto {
    @IsEmail({}, { message: 'Please provide a valid email address.' })
    email: string;

    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long.' })
    @MaxLength(32, { message: 'Password cannot exceed 32 characters.' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    })
    password: string;

    @IsString()
    @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ-]+(?: [A-Za-zÀ-ÖØ-öø-ÿ-]+)*$/, {
        message: 'First name must only contain letters, spaces, or hyphens.'
    })

    @MinLength(2, { message: 'First name must be at least 2 characters long.' })
    @MaxLength(50, { message: 'First name cannot exceed 50 characters.' })
    firstName: string;

    @IsString()
    @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ-]+(?: [A-Za-zÀ-ÖØ-öø-ÿ-]+)*$/, {
        message: 'Last name must only contain letters, spaces, or hyphens.'
    })

    @MinLength(2, { message: 'Last name must be at least 2 characters long.' })
    @MaxLength(50, { message: 'Last name cannot exceed 50 characters.' })
    lastName: string;
}
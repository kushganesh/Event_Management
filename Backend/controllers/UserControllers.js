const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const ActivityLog = require('../models/UserActivityLog');

// Utility function to log activities
const logActivity = async (userId, action, details) => {
    try {
        await new ActivityLog({ userId, action, details }).save();
    } catch (error) {
        console.error('Error logging activity:', error);
    }
};

const userRegister = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        await logActivity(newUser._id, 'User Registered', `User "${name}" registered.`);
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        await logActivity(user._id, 'User Logged In', 'User logged in successfully.');
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const UpdateProfile = async (req, res) => {
    const { name, email } = req.body;
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.name = name || user.name;
        user.email = email || user.email;

        await user.save();
        await logActivity(user._id, 'Profile Updated', `User profile updated. Name: ${name}, Email: ${email}`);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const ForgetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Generate token
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; 
        // Token expires in 1 hour

        await user.save();

        // Send email with reset code
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: 'Password Reset Request',
            text: `You are receiving this because you (or someone else) have requested a password reset. Please use the following code to reset your password: ${resetToken}`,
        };

        await transporter.sendMail(mailOptions);
        await logActivity(user._id, 'Password Reset Requested', 'Password reset token sent to user.');

        res.status(200).json({ message: 'Email sent with password reset instructions' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const ResetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

        // Hash new password
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();
        await logActivity(user._id, 'Password Reset', 'Password successfully reset.');

        res.status(200).json({ message: 'Password has been reset' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { userRegister, userLogin, UpdateProfile, ForgetPassword, ResetPassword };

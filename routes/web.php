<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VerificationController;
use App\Http\Controllers\EmployerController;
use App\Http\Controllers\StudentProfileController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\InternshipController;
use App\Http\Controllers\AdminController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::post('/notifications/{id}/read', function ($id) {
    $notification = auth()->user()->notifications()->findOrFail($id);
    $notification->markAsRead();

    return back();
});

Route::post('/admin/notifications/read/{id}', function ($id) {
    $admin = Auth::user();
    $notification = $admin->notifications()->find($id);
    if ($notification) $notification->markAsRead();
    return back();
})->middleware('auth');


// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Admin Verification Routes
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/admin/verification', [AdminController::class, 'studentList'])->name('admin.verification');
    Route::get('/admin/monitor/student', [AdminController::class, 'monitorStudent'])->name('admin.monitor');
    Route::get('/admin/verification/{id}', [AdminController::class, 'showVerificationDetails'])->name('admin.verificationDetails');

    Route::post
    ('/admin/verification/{id}/status', [AdminController::class, 'updateVerificationStatus'])->name('admin.updateVerificationStatus');
    Route::get('/admin/notifications', [AdminController::class, 'notification'])->name('admin.notification');
});

Route::middleware(['auth', 'employer'])->group(function () {
    Route::get('/employer/dashboard', [EmployerController::class, 'dashboard'])->name('employer.dashboard');
    Route::get('/employers', [EmployerController::class, 'employerProfile'])->name('employers.index');
    Route::get('/employers/create', [EmployerController::class, 'create'])->name('employers.create');
    Route::get('/employers/{employerProfile}/edit', [EmployerController::class, 'edit'])->name('employers.edit');
    Route::post('/employers/', [EmployerController::class, 'store'])->name('employers.store');
    Route::put('/employers/{employerProfile}', [EmployerController::class, 'update'])->name('employers.update');
    Route::delete('/employers/{employerProfile}', [EmployerController::class, 'destroy'])->name('employers.destroy');
    Route::get('/employer/notification', [EmployerController::class, 'notification'])->name('employer.notification');
    Route::get('/employer/internships', [InternshipController::class, 'index'])->name('internships.index');
    Route::get('/employer/internships/create', [InternshipController::class, 'create'])->name('internships.create');
    Route::post('/employer/internships', [InternshipController::class, 'store'])->name('internships.store');
    Route::get('/employer/internships/{internship}/edit', [InternshipController::class, 'edit'])->name('internships.edit');
    Route::patch('/employer/internships/{internship}', [InternshipController::class, 'update'])->name('internships.update');
    Route::delete('/internships/{internship}', [InternshipController::class, 'destroy'])->name('internships.destroy');
    Route::get('/employer/applicants', [EmployerController::class, 'applicants'])->name('employer.applicants');
    Route::get('/employer/applicants/{student}', [EmployerController::class, 'viewProfile']);
    Route::put('/employer/applications/{id}/status', [EmployerController::class, 'updateStatus']);
    Route::get('/employer/requirements', [EmployerController::class, 'showRequirements'])->name('employer.requirements.index');
    Route::get('/employer/requirements/{id}/details', [EmployerController::class, 'viewRequirementDetails'])->name('employer.requirements.view');
    Route::post('/employer/requirement/{id}/approve', [EmployerController::class, 'approveRequirement']);
    Route::post('/employer/requirement/{id}/reject', [EmployerController::class, 'rejectRequirement']);
    Route::get('/interns', [EmployerController::class, 'getInterns'])->name('interns');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [StudentProfileController::class, 'dashboard'])->name('dashboard');
    Route::get('/student/notification', [StudentProfileController::class, 'notification'])->name('notification');
    Route::get('/student/profile', [StudentProfileController::class, 'edit'])->name('student.profile.edit');
    Route::post('/student/profile', [StudentProfileController::class, 'store'])->name('student.profile.store');
    Route::put('/student/profile/update', [StudentProfileController::class, 'update'])->name('student.profile.update');
    Route::get('/student/verification', [VerificationController::class, 'create'])->name('student.verification.create');
    Route::post('/student/verification', [VerificationController::class, 'store'])->name('student.verification.store');
    Route::post('/student/application', [ApplicationController::class, 'store'])->name('apply');
    Route::get('/student/applications', [StudentProfileController::class, 'application'])->name('student.applications');
    Route::get('/student/requirements', [StudentProfileController::class, 'showRequirements'])->name('student.requirements.index');
    Route::post('/student/requirements/submit', [StudentProfileController::class, 'submitRequirements'])->name('student.requirements.store');
});
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

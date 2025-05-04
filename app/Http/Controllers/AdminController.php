<?php

namespace App\Http\Controllers;

use App\Models\Verification;
use App\Models\User;
use App\Models\Internship;
use App\Models\EmployerProfile;
use Illuminate\Http\Request;
use App\Models\Application;
use Illuminate\Support\Facades\Auth;
use App\Notifications\VerificationStatusNotification;
use Inertia\Inertia;


class AdminController extends Controller
{
    public function dashboard()
    {
        $currentStudentCount = User::where('role', 'student')->count();
        $previousStudent = User::where('role', 'student')->whereMonth('created_at', now()->subMonth()->month)->count();

        $currentInternshipCount = Internship::count();
        $previousInternshipCount = Internship::count()->whereMonth('created_at', now()->subMonth()->month)->count();

        $employerCount = User::where('role', 'employer')->count();
        $previousEmployerCount = User::where('role', 'employer')->whereMonth('created_at', now()->subMonth()->month)->count();

        return Inertia::render('Admin/Dashboard', [
            'studentStats' => [
                'count' => $currentStudentCount,
                'change' => $this->calculateChange($currentStudentCount, $previousStudent),
            ],
            'internshipStats' => [
                'count' => $currentInternshipCount,
                'change' => $this->calculateChange($currentInternshipCount, $previousInternshipCount),
            ],
            'employerStats' => [

            ]
        ]);
    }

    public function calculateChange($current, $previous)
    {
        if ($previous == 0) {
            return $current > 0 ? 100 : 0;
        }

        return round((($current - $previous) / $previous) * 100);
    }

    public function monitorStudent()
    {
        $applications = Application::whereHas('studentProfile')
            ->with('studentProfile')
            ->get();

        $students = $applications->groupBy('student_id')->map(function ($applications) {
            $firstApplication = $applications->first();

            $studentProfile = $firstApplication->studentProfile;

            $accepted = $applications->contains(function ($application) {
                return $application->status === 'accepted';
            });

            return [
                'student_id' => $firstApplication->student_id,
                'school_id' => $studentProfile->school_id,
                'first_name' => $studentProfile->first_name,
                'middle_name' => $studentProfile->middle_name,
                'last_name' => $studentProfile->last_name,
                'year_level' => $studentProfile->year_level,
                'final_status' => $accepted ? 'accepted' : 'rejected',
            ];
        })->values();

        return Inertia::render('Admin/Monitor', [
            'students' => $students,
        ]);
    }


    public function studentList()
    {
        $verifications = Verification::with('user')->get();
        // dd($verifications);

        return Inertia::render('Admin/Verification', [
            'verifications' => $verifications,
        ]);
    }


    public function showVerificationDetails(Request $request, $id)
    {
        $verification = Verification::findOrFail($id);

        return Inertia::render('Admin/VerificationDetails', [
            'verification' => $verification,
        ]);
    }

    public function updateVerificationStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:approved,rejected',
        ]);

        $verification = Verification::findOrFail($id);

        $verification->status = $validated['status'];

        $verification->save();

        $user = $verification->user;
        $user->notify(new VerificationStatusNotification($request->status, $request->remarks));

        return back()->with('success', 'Verification status updated successfully!');
    }

    public function notification()
    {
        $admin = Auth::user();
        return Inertia::render('Admin/Notification', [
            'notifications' => $admin->notifications,
        ]);
    }

}

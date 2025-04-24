<?php

namespace App\Http\Controllers;

use App\Models\Verification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Notifications\VerificationStatusNotification;
use Inertia\Inertia;


class AdminController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard');
    }

    public function monitorStudent()
    {
        $students = User::whereHas('studentProfile')
            ->with('studentProfile')
            ->get();

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

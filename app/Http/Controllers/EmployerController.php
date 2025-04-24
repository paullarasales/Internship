<?php

namespace App\Http\Controllers;

use App\Notifications\ApplicationStatusNotification;
use App\Models\InternshipRequirement;
use App\Models\User;
use App\Models\EmployerProfile;
use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\StudentProfile;
use Inertia\Inertia;

class EmployerController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Employer/Dashboard');
    }

    public function showProfile()
    {
        $profile = EmployerProfile::where('user_id', auth()->id())->first();

        return Inertia::render('Employer/Profile', [
            'profile' => $profile
        ]);
    }

    public function editProfile()
    {
        $profile = EmployerProfile::where('user_id', auth()->id())->first();

        return Inertia::render('Employer/EditProfile', [
            'profile' => $profile
        ]);
    }

    public function updateProfile(Request $request)
    {
        $request->validate([
            'company_name' => 'required|string|max:255',
            'contact_name' => 'required|string|max:255',
            'contact_number' => 'required|string|max:15',
            'company_email' => 'required',
            'company_address' => 'required|string|max:255',
            'description' => 'nullable|string',
            'website' => 'nullable|url',
        ]);

        $profile = EmployerProfile::where('user_id', auth()->id())->first();

        if ($profile) {
            $profile->update($request->all());
        } else {
            EmployerProfile::create([
                'user_id' => auth()->id(),
                'company_name' => $request->input('company_name'),
                'contact_name' => $request->input('contact_name'),
                'contact_number' => $request->input('contact_number'),
                'company_email' => $request->input('company_email'),
                'company_address' => $request->input('company_address'),
                'description' => $request->input('description'),
                'website' => $request->input('website'),
            ]);
        }

        return redirect()->route('employer.profile.show')->with('success', 'Profile updated successfully.');
    }

    public function applicants()
    {
        $applications = Application::with(['studentProfile', 'internship'])->get();

        return Inertia::render('Employer/Applicants', [
            'applications' => $applications
        ]);
    }

    public function viewProfile($studentId)
    {
        $profile = StudentProfile::where('user_id', $studentId)->firstOrFail();

        return Inertia::render('Employer/ViewProfile', [
            'profile' => $profile
        ]);
    }

    public function updateStatus(Request $request, $applicationId)
    {
        $request->validate([
            'status' => 'required|in:accepted,rejected',
        ]);

        $application = Application::findOrFail($applicationId);
        $application->status = $request->status;
        $application->save();

        if ($application->studentProfile) {
            $studentProfile = $application->studentProfile;
            $studentProfile->status = $request->status;
            $studentProfile->save();

            if ($studentProfile->user) {
                $student = $studentProfile->user;
                $student->notify(new ApplicationStatusNotification(
                    $request->status,
                    optional($application->internship)->title ?? 'the internship'
                ));
            }
        }

        return redirect()->back()->with('success', 'Status updated and student notified.');
    }



    public function notification()
    {
        return Inertia::render('Employer/Notification', [
            'notifications' => auth()->user()->notifications,
        ]);
    }

    public function showRequirements()
    {
        $requirements = InternshipRequirement::with('user')->get();

        return inertia('Employer/Requirements', [
            'requirements' => $requirements,
        ]);
    }

    public function viewRequirementDetails($id)
    {
        $requirement = InternshipRequirement::with('user')->findOrFail($id);

        return inertia('Employer/RequirementDetails', [
            'requirement' => $requirement,
        ]);
    }

    public function approveRequirement($id)
    {
        $requirement = InternshipRequirement::findOrFail($id);
        $requirement->status = 'approved';
        $requirement->save();

        return redirect()->back()->with('message', 'Requirement approved successfully.');
    }

    public function rejectRequirement($id)
    {
        $requirement = InternshipRequirement::findOrFail($id);
        $requirement->status = 'rejected';
        $requirement->save();

        return redirect()->back()->with('message', 'Requirement rejected successfully.');
    }
}

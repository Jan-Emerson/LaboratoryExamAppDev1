<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Ticket;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Demo account for testing
        $user = User::firstOrCreate(
            ['email' => 'demo@helpdesk.com'],
            [
                'name'     => 'Demo User',
                'password' => Hash::make('password'),
            ]
        );

        // Sample tickets
        $tickets = [
            [
                'title'       => 'Laptop screen flickering randomly',
                'description' => 'My laptop screen starts flickering after about 30 minutes of use. It gets worse when plugged into an external monitor.',
                'priority'    => 'High',
                'status'      => 'Open',
                'category'    => 'Hardware',
            ],
            [
                'title'       => 'Cannot access VPN from home',
                'description' => 'Since last week I have been unable to connect to the company VPN from my home network. Other networks work fine.',
                'priority'    => 'Urgent',
                'status'      => 'In Progress',
                'category'    => 'Network',
            ],
            [
                'title'       => 'Excel crashes when opening large files',
                'description' => 'Microsoft Excel crashes every time I try to open files larger than 10MB. This started after the recent Windows update.',
                'priority'    => 'Medium',
                'status'      => 'Resolved',
                'category'    => 'Software',
            ],
        ];

        foreach ($tickets as $ticketData) {
            Ticket::create([...$ticketData, 'user_id' => $user->id]);
        }
    }
}

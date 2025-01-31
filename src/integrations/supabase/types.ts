export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      affiliate_materials: {
        Row: {
          access_level: string
          category: string
          content_url: string
          created_at: string
          description: string | null
          id: string
          is_featured: boolean | null
          resource_type: string
          thumbnail_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          access_level?: string
          category: string
          content_url: string
          created_at?: string
          description?: string | null
          id?: string
          is_featured?: boolean | null
          resource_type: string
          thumbnail_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          access_level?: string
          category?: string
          content_url?: string
          created_at?: string
          description?: string | null
          id?: string
          is_featured?: boolean | null
          resource_type?: string
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      affiliate_orders: {
        Row: {
          affiliate_id: string
          commission_amount: number
          created_at: string
          id: string
          order_id: string
          payout_date: string | null
          status: string
        }
        Insert: {
          affiliate_id: string
          commission_amount: number
          created_at?: string
          id?: string
          order_id: string
          payout_date?: string | null
          status?: string
        }
        Update: {
          affiliate_id?: string
          commission_amount?: number
          created_at?: string
          id?: string
          order_id?: string
          payout_date?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_orders_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "affiliate_orders_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: true
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliates: {
        Row: {
          commission_rate: number
          company_name: string
          contact_email: string
          contact_name: string
          contact_phone: string
          created_at: string
          id: string
          marketing_preferences: Json | null
          payment_info: Json | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          commission_rate?: number
          company_name: string
          contact_email: string
          contact_name: string
          contact_phone: string
          created_at?: string
          id?: string
          marketing_preferences?: Json | null
          payment_info?: Json | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          commission_rate?: number
          company_name?: string
          contact_email?: string
          contact_name?: string
          contact_phone?: string
          created_at?: string
          id?: string
          marketing_preferences?: Json | null
          payment_info?: Json | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      analytics: {
        Row: {
          created_at: string
          date: string
          id: string
          metrics: Json
          restaurant_id: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          metrics: Json
          restaurant_id: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          metrics?: Json
          restaurant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "analytics_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurant_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          approved_for_wholesale: boolean | null
          created_at: string
          full_name: string | null
          id: string
          is_restaurant: boolean | null
          loyalty_tier_id: string | null
          stripe_customer_id: string | null
          total_points: number | null
          updated_at: string
        }
        Insert: {
          approved_for_wholesale?: boolean | null
          created_at?: string
          full_name?: string | null
          id: string
          is_restaurant?: boolean | null
          loyalty_tier_id?: string | null
          stripe_customer_id?: string | null
          total_points?: number | null
          updated_at?: string
        }
        Update: {
          approved_for_wholesale?: boolean | null
          created_at?: string
          full_name?: string | null
          id?: string
          is_restaurant?: boolean | null
          loyalty_tier_id?: string | null
          stripe_customer_id?: string | null
          total_points?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "customers_loyalty_tier_id_fkey"
            columns: ["loyalty_tier_id"]
            isOneToOne: false
            referencedRelation: "loyalty_tiers"
            referencedColumns: ["id"]
          },
        ]
      }
      delivery_items: {
        Row: {
          created_at: string
          delivery_id: string
          id: string
          product_id: string
          quantity: number
        }
        Insert: {
          created_at?: string
          delivery_id: string
          id?: string
          product_id: string
          quantity: number
        }
        Update: {
          created_at?: string
          delivery_id?: string
          id?: string
          product_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "delivery_items_delivery_id_fkey"
            columns: ["delivery_id"]
            isOneToOne: false
            referencedRelation: "restaurant_deliveries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "delivery_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      distributor_inventory: {
        Row: {
          distributor_id: string
          id: string
          last_updated: string
          product_id: string
          quantity: number
        }
        Insert: {
          distributor_id: string
          id?: string
          last_updated?: string
          product_id: string
          quantity?: number
        }
        Update: {
          distributor_id?: string
          id?: string
          last_updated?: string
          product_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "distributor_inventory_distributor_id_fkey"
            columns: ["distributor_id"]
            isOneToOne: false
            referencedRelation: "distributors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "distributor_inventory_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      distributors: {
        Row: {
          address: string
          business_hours: Json | null
          city: string
          contact_email: string
          contact_name: string
          contact_phone: string
          country: string
          created_at: string
          id: string
          is_active: boolean | null
          latitude: number
          longitude: number
          name: string
          postal_code: string
          services_offered: string[] | null
          state: string
          updated_at: string
        }
        Insert: {
          address: string
          business_hours?: Json | null
          city: string
          contact_email: string
          contact_name: string
          contact_phone: string
          country?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          latitude: number
          longitude: number
          name: string
          postal_code: string
          services_offered?: string[] | null
          state: string
          updated_at?: string
        }
        Update: {
          address?: string
          business_hours?: Json | null
          city?: string
          contact_email?: string
          contact_name?: string
          contact_phone?: string
          country?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          latitude?: number
          longitude?: number
          name?: string
          postal_code?: string
          services_offered?: string[] | null
          state?: string
          updated_at?: string
        }
        Relationships: []
      }
      email_notifications: {
        Row: {
          created_at: string
          customer_id: string
          error_message: string | null
          id: string
          sent_at: string | null
          status: string
          template_id: string
          variables: Json | null
        }
        Insert: {
          created_at?: string
          customer_id: string
          error_message?: string | null
          id?: string
          sent_at?: string | null
          status?: string
          template_id: string
          variables?: Json | null
        }
        Update: {
          created_at?: string
          customer_id?: string
          error_message?: string | null
          id?: string
          sent_at?: string | null
          status?: string
          template_id?: string
          variables?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "email_notifications_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_notifications_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          body: string
          created_at: string
          id: string
          name: string
          subject: string
          updated_at: string
          variables: Json | null
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          name: string
          subject: string
          updated_at?: string
          variables?: Json | null
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          name?: string
          subject?: string
          updated_at?: string
          variables?: Json | null
        }
        Relationships: []
      }
      "Kentucky Bourbon Beef": {
        Row: {
          created_at: string
          id: number
          owner_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          owner_id: string
        }
        Update: {
          created_at?: string
          id?: number
          owner_id?: string
        }
        Relationships: []
      }
      loyalty_points: {
        Row: {
          created_at: string
          customer_id: string
          expires_at: string | null
          id: string
          points: number
          source: string
          source_reference: string | null
        }
        Insert: {
          created_at?: string
          customer_id: string
          expires_at?: string | null
          id?: string
          points: number
          source: string
          source_reference?: string | null
        }
        Update: {
          created_at?: string
          customer_id?: string
          expires_at?: string | null
          id?: string
          points?: number
          source?: string
          source_reference?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_points_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      loyalty_redemptions: {
        Row: {
          created_at: string
          customer_id: string
          id: string
          points_spent: number
          reward_id: string
          status: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          customer_id: string
          id?: string
          points_spent: number
          reward_id: string
          status?: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          customer_id?: string
          id?: string
          points_spent?: number
          reward_id?: string
          status?: string
          used_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_redemptions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_redemptions_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "loyalty_rewards"
            referencedColumns: ["id"]
          },
        ]
      }
      loyalty_rewards: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          min_tier_id: string | null
          name: string
          points_cost: number
          reward_type: string
          reward_value: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          min_tier_id?: string | null
          name: string
          points_cost: number
          reward_type: string
          reward_value: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          min_tier_id?: string | null
          name?: string
          points_cost?: number
          reward_type?: string
          reward_value?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_rewards_min_tier_id_fkey"
            columns: ["min_tier_id"]
            isOneToOne: false
            referencedRelation: "loyalty_tiers"
            referencedColumns: ["id"]
          },
        ]
      }
      loyalty_tiers: {
        Row: {
          benefits: Json | null
          created_at: string
          id: string
          name: string
          point_multiplier: number
          required_points: number
        }
        Insert: {
          benefits?: Json | null
          created_at?: string
          id?: string
          name: string
          point_multiplier?: number
          required_points: number
        }
        Update: {
          benefits?: Json | null
          created_at?: string
          id?: string
          name?: string
          point_multiplier?: number
          required_points?: number
        }
        Relationships: []
      }
      notification_preferences: {
        Row: {
          created_at: string
          customer_id: string
          id: string
          loyalty_updates: boolean | null
          marketing_emails: boolean | null
          order_updates: boolean | null
          review_reminders: boolean | null
          shipping_updates: boolean | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id: string
          id?: string
          loyalty_updates?: boolean | null
          marketing_emails?: boolean | null
          order_updates?: boolean | null
          review_reminders?: boolean | null
          shipping_updates?: boolean | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string
          id?: string
          loyalty_updates?: boolean | null
          marketing_emails?: boolean | null
          order_updates?: boolean | null
          review_reminders?: boolean | null
          shipping_updates?: boolean | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_preferences_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: true
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string
          price_at_time: number
          product_id: string
          quantity: number
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          price_at_time: number
          product_id: string
          quantity: number
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          price_at_time?: number
          product_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      order_tracking: {
        Row: {
          created_at: string
          estimated_delivery: string | null
          id: string
          order_id: string
          shipping_carrier: string | null
          status: string
          status_updates: Json | null
          tracking_number: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          estimated_delivery?: string | null
          id?: string
          order_id: string
          shipping_carrier?: string | null
          status: string
          status_updates?: Json | null
          tracking_number?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          estimated_delivery?: string | null
          id?: string
          order_id?: string
          shipping_carrier?: string | null
          status?: string
          status_updates?: Json | null
          tracking_number?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_tracking_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: true
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          affiliate_code: string | null
          affiliate_id: string | null
          created_at: string
          customer_id: string | null
          id: string
          shipping_address: string
          status: string
          total_amount: number
          tracking_number: string | null
          updated_at: string
        }
        Insert: {
          affiliate_code?: string | null
          affiliate_id?: string | null
          created_at?: string
          customer_id?: string | null
          id?: string
          shipping_address: string
          status?: string
          total_amount: number
          tracking_number?: string | null
          updated_at?: string
        }
        Update: {
          affiliate_code?: string | null
          affiliate_id?: string | null
          created_at?: string
          customer_id?: string | null
          id?: string
          shipping_address?: string
          status?: string
          total_amount?: number
          tracking_number?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_methods: {
        Row: {
          card_brand: string
          created_at: string
          customer_id: string
          expiry_month: number
          expiry_year: number
          id: string
          is_default: boolean | null
          last_four: string
          stripe_payment_method_id: string
          updated_at: string
        }
        Insert: {
          card_brand: string
          created_at?: string
          customer_id: string
          expiry_month: number
          expiry_year: number
          id?: string
          is_default?: boolean | null
          last_four: string
          stripe_payment_method_id: string
          updated_at?: string
        }
        Update: {
          card_brand?: string
          created_at?: string
          customer_id?: string
          expiry_month?: number
          expiry_year?: number
          id?: string
          is_default?: boolean | null
          last_four?: string
          stripe_payment_method_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_methods_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_transactions: {
        Row: {
          amount: number
          created_at: string
          currency: string
          error_message: string | null
          id: string
          order_id: string
          status: string
          stripe_payment_intent_id: string | null
          stripe_session_id: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          error_message?: string | null
          id?: string
          order_id: string
          status: string
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          error_message?: string | null
          id?: string
          order_id?: string
          status?: string
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_transactions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          aging_duration: number | null
          aging_tier: string | null
          category: string
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_bdc_certified: boolean | null
          minimum_wholesale_quantity: number | null
          name: string
          price: number
          pricing_tiers: Json | null
          stock_quantity: number | null
          updated_at: string
          wholesale_price: number | null
        }
        Insert: {
          aging_duration?: number | null
          aging_tier?: string | null
          category: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_bdc_certified?: boolean | null
          minimum_wholesale_quantity?: number | null
          name: string
          price: number
          pricing_tiers?: Json | null
          stock_quantity?: number | null
          updated_at?: string
          wholesale_price?: number | null
        }
        Update: {
          aging_duration?: number | null
          aging_tier?: string | null
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_bdc_certified?: boolean | null
          minimum_wholesale_quantity?: number | null
          name?: string
          price?: number
          pricing_tiers?: Json | null
          stock_quantity?: number | null
          updated_at?: string
          wholesale_price?: number | null
        }
        Relationships: []
      }
      recipe_comments: {
        Row: {
          content: string
          created_at: string
          customer_id: string
          id: string
          is_approved: boolean | null
          recipe_id: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          customer_id: string
          id?: string
          is_approved?: boolean | null
          recipe_id: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          customer_id?: string
          id?: string
          is_approved?: boolean | null
          recipe_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipe_comments_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_comments_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_likes: {
        Row: {
          created_at: string
          customer_id: string
          id: string
          recipe_id: string
        }
        Insert: {
          created_at?: string
          customer_id: string
          id?: string
          recipe_id: string
        }
        Update: {
          created_at?: string
          customer_id?: string
          id?: string
          recipe_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipe_likes_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_likes_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipes: {
        Row: {
          cooking_time: unknown | null
          created_at: string
          customer_id: string
          description: string | null
          difficulty: string | null
          featured: boolean | null
          id: string
          ingredients: Json
          instructions: Json
          likes_count: number | null
          social_shares: Json | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          cooking_time?: unknown | null
          created_at?: string
          customer_id: string
          description?: string | null
          difficulty?: string | null
          featured?: boolean | null
          id?: string
          ingredients: Json
          instructions: Json
          likes_count?: number | null
          social_shares?: Json | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          cooking_time?: unknown | null
          created_at?: string
          customer_id?: string
          description?: string | null
          difficulty?: string | null
          featured?: boolean | null
          id?: string
          ingredients?: Json
          instructions?: Json
          likes_count?: number | null
          social_shares?: Json | null
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipes_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_deliveries: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          restaurant_id: string
          scheduled_date: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          restaurant_id: string
          scheduled_date: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          restaurant_id?: string
          scheduled_date?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_deliveries_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurant_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_inventory: {
        Row: {
          created_at: string
          id: string
          last_restocked: string | null
          max_quantity: number
          min_quantity: number
          next_delivery: string | null
          product_id: string
          quantity: number
          restaurant_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_restocked?: string | null
          max_quantity: number
          min_quantity: number
          next_delivery?: string | null
          product_id: string
          quantity?: number
          restaurant_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          last_restocked?: string | null
          max_quantity?: number
          min_quantity?: number
          next_delivery?: string | null
          product_id?: string
          quantity?: number
          restaurant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_inventory_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "restaurant_inventory_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurant_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string
          price_at_time: number
          product_id: string
          quantity: number
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          price_at_time: number
          product_id: string
          quantity: number
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          price_at_time?: number
          product_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "restaurant_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "restaurant_order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_orders: {
        Row: {
          created_at: string
          delivery_date: string
          id: string
          notes: string | null
          restaurant_id: string
          status: string
          total_amount: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          delivery_date: string
          id?: string
          notes?: string | null
          restaurant_id: string
          status?: string
          total_amount: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          delivery_date?: string
          id?: string
          notes?: string | null
          restaurant_id?: string
          status?: string
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_orders_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurant_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_profiles: {
        Row: {
          address: string
          contact_email: string
          contact_name: string
          contact_phone: string
          created_at: string
          delivery_instructions: string | null
          id: string
          name: string
          preferred_delivery_days: string[] | null
          preferred_delivery_time: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address: string
          contact_email: string
          contact_name: string
          contact_phone: string
          created_at?: string
          delivery_instructions?: string | null
          id?: string
          name: string
          preferred_delivery_days?: string[] | null
          preferred_delivery_time?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string
          contact_email?: string
          contact_name?: string
          contact_phone?: string
          created_at?: string
          delivery_instructions?: string | null
          id?: string
          name?: string
          preferred_delivery_days?: string[] | null
          preferred_delivery_time?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      restock_requests: {
        Row: {
          created_at: string
          id: string
          inventory_item_id: string
          notes: string | null
          quantity: number | null
          restaurant_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          inventory_item_id: string
          notes?: string | null
          quantity?: number | null
          restaurant_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          inventory_item_id?: string
          notes?: string | null
          quantity?: number | null
          restaurant_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "restock_requests_inventory_item_id_fkey"
            columns: ["inventory_item_id"]
            isOneToOne: false
            referencedRelation: "restaurant_inventory"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "restock_requests_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurant_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      review_helpful: {
        Row: {
          created_at: string
          customer_id: string
          id: string
          review_id: string
        }
        Insert: {
          created_at?: string
          customer_id: string
          id?: string
          review_id: string
        }
        Update: {
          created_at?: string
          customer_id?: string
          id?: string
          review_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_helpful_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_helpful_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          created_at: string
          customer_id: string
          id: string
          product_id: string
          rating: number
          review_text: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id: string
          id?: string
          product_id: string
          rating: number
          review_text?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string
          id?: string
          product_id?: string
          rating?: number
          review_text?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_addresses: {
        Row: {
          address_line1: string
          address_line2: string | null
          city: string
          country: string
          created_at: string | null
          customer_id: string
          id: string
          is_default: boolean | null
          postal_code: string
          state: string
          updated_at: string | null
        }
        Insert: {
          address_line1: string
          address_line2?: string | null
          city: string
          country?: string
          created_at?: string | null
          customer_id: string
          id?: string
          is_default?: boolean | null
          postal_code: string
          state: string
          updated_at?: string | null
        }
        Update: {
          address_line1?: string
          address_line2?: string | null
          city?: string
          country?: string
          created_at?: string | null
          customer_id?: string
          id?: string
          is_default?: boolean | null
          postal_code?: string
          state?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "saved_addresses_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_items: {
        Row: {
          created_at: string | null
          customer_id: string
          id: string
          product_id: string
        }
        Insert: {
          created_at?: string | null
          customer_id: string
          id?: string
          product_id: string
        }
        Update: {
          created_at?: string | null
          customer_id?: string
          id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_items_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          created_at: string | null
          description: string | null
          features: Json
          id: string
          interval: string
          name: string
          price: number
          stripe_price_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          features?: Json
          id?: string
          interval: string
          name: string
          price: number
          stripe_price_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          features?: Json
          id?: string
          interval?: string
          name?: string
          price?: number
          stripe_price_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tour_hotspots: {
        Row: {
          audio_url: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          position: Json
          title: string
        }
        Insert: {
          audio_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          position: Json
          title: string
        }
        Update: {
          audio_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          position?: Json
          title?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_customer_tier: {
        Args: {
          customer_uuid: string
        }
        Returns: string
      }
      get_helpful_count: {
        Args: {
          review_id: string
        }
        Returns: number
      }
      get_points_balance: {
        Args: {
          customer_uuid: string
        }
        Returns: number
      }
      is_verified_purchase: {
        Args: {
          review_customer_id: string
          review_product_id: string
        }
        Returns: boolean
      }
      update_order_status: {
        Args: {
          order_uuid: string
          new_status: string
          tracking_info?: Json
        }
        Returns: undefined
      }
    }
    Enums: {
      product_category: "beef" | "pork" | "poultry" | "seafood" | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
